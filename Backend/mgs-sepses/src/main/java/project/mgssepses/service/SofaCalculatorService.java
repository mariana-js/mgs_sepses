package project.mgssepses.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class SofaCalculatorService {

    // ===== Resultado do SOFA =====
    public static final class SofaResult {

        public final int total;
        public final Map<String, Integer> componentes; // respiratory, coagulation, liver, cardiovascular, cns, renal

        public SofaResult(int total, Map<String, Integer> componentes) {
            this.total = total;
            this.componentes = componentes;
        }
    }

    // ===== API principal (SOMENTE SEPSE) =====
    /**
     * Calcula os 6 componentes do SOFA e retorna o total (0–24).
     */
    public SofaResult calcularSofa(
            String relacaoPao2FiO2, String plaquetas, String bilirrubina,
            String pam, String norepinefrina, String dobutamina, String dopamina,
            String glasgow, String creatinina, String diurese, String ep
    ) {
        int resp = scoreRespiratorio(relacaoPao2FiO2, ep);
        int coag = scoreCoagulacao(plaquetas);
        int fig = scoreFigado(bilirrubina);
        int card = scoreCardio(pam, dopamina, dobutamina, norepinefrina);
        int cns = scoreCns(glasgow);
        int renal = scoreRenal(creatinina, diurese);

        int total = resp + coag + fig + card + cns + renal;

        Map<String, Integer> map = new HashMap<>();
        map.put("respiratory", resp);
        map.put("coagulation", coag);
        map.put("liver", fig);
        map.put("cardiovascular", card);
        map.put("cns", cns);
        map.put("renal", renal);

        return new SofaResult(total, map);
    }

    /**
     * Regra Sepsis‑3 para SEPSE: ΔSOFA ≥ 2 (use basal=0 quando desconhecido).
     */
    public boolean deltaSofaMaiorOuIgualA2(int sofaAtual, Integer sofaBasal) {
        int basal = (sofaBasal == null ? 0 : sofaBasal);
        return (sofaAtual - basal) >= 2;
    }

    /**
     * Percentual de risco de SEPSE baseado APENAS no SOFA (sem lactato/choque).
     * Política simples e conservadora: - ΔSOFA < 2  -> "0%" - ΔSOFA ≥ 2 ->
     * mínimo "10%" (Sepsis‑3 reporta >10%); faixas por SOFA total: SOFA 2–3 ->
     * "10%" SOFA 4–7 -> "15%" SOFA 8–11 -> "20%" SOFA ≥12 -> "30%"
     *
     * Se quiser, pode ajustar esses degraus depois via properties.
     */
    public String percentualRiscoSepsePorSOFA(int sofaAtual, Integer sofaBasal) {
        if (!deltaSofaMaiorOuIgualA2(sofaAtual, sofaBasal)) {
            return "0%";
        }
        if (sofaAtual >= 12) {
            return "30%";
        }
        if (sofaAtual >= 8) {
            return "20%";
        }
        if (sofaAtual >= 4) {
            return "15%";
        }
        return "10%"; // Δ≥2 com SOFA baixo
    }

    /**
     * Método “tudo‑em‑um” para usar logo após o INSERT de DADOS_CLINICOS:
     * retorna o percentual de risco de SEPSE (string pronta para gravar em
     * RISCO_SEPSE.RISCO).
     */
    public String calcularPercentualRiscoSepse(
            String relacaoPao2FiO2, String plaquetas, String bilirrubina,
            String pam, String norepinefrina, String dobutamina, String dopamina,
            String glasgow, String creatinina, String diurese, String epSuporteVentilatorio,
            Integer sofaBasal // passe 0 se não souber
    ) {
        SofaResult r = calcularSofa(
                relacaoPao2FiO2, plaquetas, bilirrubina,
                pam, norepinefrina, dobutamina, dopamina,
                glasgow, creatinina, diurese, epSuporteVentilatorio
        );
        return percentualRiscoSepsePorSOFA(r.total, sofaBasal);
    }

    // ===== Componentes do SOFA (só IFs) =====
    private int scoreRespiratorio(String relacaoPao2FiO2, String epSuporteVentilatorio) {
        Double pafi = toDouble(relacaoPao2FiO2);
        boolean suporte = isYes(epSuporteVentilatorio);
        if (pafi == null) {
            return 0;
        }
        if (pafi >= 400.0) {
            return 0;
        }
        if (suporte && pafi < 100.0) {
            return 4;
        }
        if (suporte && pafi < 200.0) {
            return 3;
        }
        if (pafi < 300.0) {
            return 2;
        }
        if (pafi < 400.0) {
            return 1;
        }
        return 0;
        // Observação: as faixas <200 e <100 exigem “com suporte ventilatório”.
    }

    private int scoreCoagulacao(String plaquetas) {
        Double plt = toDouble(plaquetas);
        if (plt == null) {
            return 0;
        }
        if (plt < 20.0) {
            return 4;
        }
        if (plt < 50.0) {
            return 3;
        }
        if (plt < 100.0) {
            return 2;
        }
        if (plt < 150.0) {
            return 1;
        }
        return 0;
    }

    private int scoreFigado(String bilirrubina) {
        Double bili = toDouble(bilirrubina);
        if (bili == null) {
            return 0;
        }
        if (bili >= 12.0) {
            return 4;
        }
        if (bili >= 6.0) {
            return 3;
        }
        if (bili >= 2.0) {
            return 2;
        }
        if (bili >= 1.2) {
            return 1;
        }
        return 0;
    }

    private int scoreCardio(String pam, String dopamina, String dobutamina, String norepinefrina) {
        Double map = toDouble(pam);
        Double dop = toDouble(dopamina);
        Double dob = toDouble(dobutamina);
        Double nor = toDouble(norepinefrina);

        boolean usaVaso = isPos(dop) || isPos(dob) || isPos(nor);

        // Sem vasopressor -> só pela PAM
        if (!usaVaso) {
            if (map == null) {
                return 0;
            }
            if (map < 70.0) {
                return 1;
            }
            return 0;
        }

        // Com vasopressor (dose em µg/kg/min)
        if ((dop != null && dop > 15.0) || (nor != null && nor > 0.1)) {
            return 4;
        }
        if ((dop != null && dop > 5.0) || (nor != null && nor > 0.0 && nor <= 0.1)) {
            return 3;
        }
        if ((dop != null && dop > 0.0 && dop <= 5.0) || (dob != null && dob > 0.0)) {
            return 2;
        }
        return 1;
    }

    private int scoreCns(String glasgow) {
        Integer gcs = toInt(glasgow);
        if (gcs == null) {
            return 0;
        }
        if (gcs < 6) {
            return 4;
        }
        if (gcs <= 9) {
            return 3;
        }
        if (gcs <= 12) {
            return 2;
        }
        if (gcs <= 14) {
            return 1;
        }
        return 0; // 15
    }

    private int scoreRenal(String creatinina, String diurese) {
        Double creat = toDouble(creatinina);
        Double diur = toDouble(diurese);
        if (diur != null) {
            if (diur < 200.0) {
                return 4;
            }
            if (diur < 500.0) {
                return 3;
            }
        }
        if (creat == null) {
            return 0;
        }
        if (creat >= 5.0) {
            return 4;
        }
        if (creat >= 3.5) {
            return 3;
        }
        if (creat >= 2.0) {
            return 2;
        }
        if (creat >= 1.2) {
            return 1;
        }
        return 0;
    }

    // ===== Utils =====
    private static Double toDouble(String s) {
        try {
            if (s == null || s.isBlank()) {
                return null;
            }
            return new BigDecimal(s.replace(",", ".")).doubleValue();
        } catch (Exception e) {
            return null;
        }
    }

    private static Integer toInt(String s) {
        try {
            if (s == null || s.isBlank()) {
                return null;
            }
            return Integer.parseInt(s.trim());
        } catch (Exception e) {
            return null;
        }
    }

    private static boolean isYes(String s) {
        if (s == null) {
            return false;
        }
        String v = s.trim().toUpperCase();
        return v.equals("S") || v.equals("SIM") || v.equals("Y") || v.equals("YES") || v.equals("TRUE");
    }

    private static boolean isPos(Double v) {
        return v != null && v > 0.0;
    }

}
