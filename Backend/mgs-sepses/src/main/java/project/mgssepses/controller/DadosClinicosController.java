package project.mgssepses.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import project.mgssepses.dtos.DadosClinicosDto;
import project.mgssepses.model.DadosClinicos;
import project.mgssepses.service.DadosClinicosService;


@RestController
@RequestMapping("/paciente/dados_clinicos")
public class DadosClinicosController {
    final DadosClinicosService dadosService;
    private final Logger log = LoggerFactory.getLogger(DadosClinicosController.class);

    public DadosClinicosController(DadosClinicosService dadosService) {
        this.dadosService = dadosService;
    }

    @GetMapping
    public  ResponseEntity<List<DadosClinicos>> getAllDados() {
        return ResponseEntity.status(HttpStatus.OK).body(dadosService.findAll());
    }

    @PostMapping
	public ResponseEntity<Object> saveDados(@RequestBody @Valid DadosClinicosDto dadosDto) {
		var dados = new DadosClinicos();
		BeanUtils.copyProperties(dadosDto, dados);
		return ResponseEntity.status(HttpStatus.CREATED).body(dadosService.save(dados));
	}


    @SuppressWarnings("rawtypes")
	@GetMapping("/{id}")
	public ResponseEntity getOneDados(@PathVariable(value = "id") UUID id) {
		Optional<DadosClinicos> dadosOptional = dadosService.findById(id);
		if (!dadosOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("dados clinicos not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(dadosOptional.get());
	}
    
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteDados(@PathVariable(value = "id") UUID id) {
		Optional<DadosClinicos> dadosOptional = dadosService.findById(id);
		if (!dadosOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("dados clinicos not found.");
		}
		try {
			dadosService.delete(dadosOptional.get());
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			log.error("Erro ao excluir dados clinicos:", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir dados clinicos.");
		}
	}
    
    @PutMapping("/{id}")
	public ResponseEntity<Object> updateEnfermeiro(@PathVariable(value = "id") UUID id,
		@RequestBody @Valid DadosClinicosDto dadosClinicosDto) {
		Optional<DadosClinicos> dadosOptional = dadosService.findById(id);
		if (!dadosOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dados clinicos not found.");
		}
		var dados = new DadosClinicos();
		BeanUtils.copyProperties(dadosClinicosDto, dados);
		dados.setId(dadosOptional.get().getId());

		return ResponseEntity.status(HttpStatus.OK).body(dadosService.save(dados));
	}
    
}
