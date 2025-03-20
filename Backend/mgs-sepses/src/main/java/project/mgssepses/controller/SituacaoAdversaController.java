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
import project.mgssepses.dtos.SituacaoAdversaDto;
import project.mgssepses.model.SituacaoAdversa;
import project.mgssepses.service.SituacaoAdversaService;

@RestController
@RequestMapping("/paciente/situacao_adversa")
public class SituacaoAdversaController {
    final SituacaoAdversaService situacaoService;
    private final Logger log = LoggerFactory.getLogger(SituacaoAdversaController.class);

    public SituacaoAdversaController(SituacaoAdversaService situacaoService) {
        this.situacaoService = situacaoService;
    }

    @GetMapping
    public  ResponseEntity<List<SituacaoAdversa>> getAllSituacaoAdversa() {
        return ResponseEntity.status(HttpStatus.OK).body(situacaoService.findAll());
    }

    @PostMapping
	public ResponseEntity<Object> saveSituacaoAdversa(@RequestBody @Valid SituacaoAdversaDto situacaoDto) {
		var situacao = new SituacaoAdversa();
		BeanUtils.copyProperties(situacaoDto, situacao);
		return ResponseEntity.status(HttpStatus.CREATED).body(situacaoService.save(situacao));
	}


    @SuppressWarnings("rawtypes")
	@GetMapping("/{id}")
	public ResponseEntity getOneSituacaoAdversa(@PathVariable(value = "id") UUID id) {
		Optional<SituacaoAdversa> situacaoOptional = situacaoService.findById(id);
		if (!situacaoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Situacao Adversa not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(situacaoOptional.get());
	}
    
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteSituacaoAdversa(@PathVariable(value = "id") UUID id) {
		Optional<SituacaoAdversa> situacaoOptional = situacaoService.findById(id);
		if (!situacaoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Situacao Adversa  not found.");
		}
		try {
			situacaoService.delete(situacaoOptional.get());
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			log.error("Erro ao excluir Situacao Adversa :", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir Situacao Adversa .");
		}
	}

    @PutMapping("/{id}")
	public ResponseEntity<Object> updateSituacaoAdversa(@PathVariable(value = "id") UUID id,
		@RequestBody @Valid SituacaoAdversaDto situacaoDto) {
		Optional<SituacaoAdversa> situacaoOptional = situacaoService.findById(id);
		if (!situacaoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Situacao Adversa  not found.");
		}
		var situacao = new SituacaoAdversa();
		BeanUtils.copyProperties(situacaoDto, situacao);
		situacao.setId(situacaoOptional.get().getId());

		return ResponseEntity.status(HttpStatus.OK).body(situacaoService.save(situacao));
	}
}
