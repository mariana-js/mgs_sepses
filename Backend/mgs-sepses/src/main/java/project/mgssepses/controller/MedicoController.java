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

import org.springframework.web.bind.annotation.CrossOrigin;
import jakarta.validation.Valid;
import project.mgssepses.dtos.MedicoDto;
import project.mgssepses.model.Medico;
import project.mgssepses.service.MedicoService;

@RestController
@RequestMapping("/profissional/medico")
@CrossOrigin(origins = "http://localhost:4200")
public class MedicoController {
    final MedicoService medicoService;

    private final Logger log = LoggerFactory.getLogger(MedicoController.class);
    public MedicoController(MedicoService medicoService) {
        this.medicoService = medicoService;
    }

    
    @GetMapping
    public ResponseEntity<List<Medico>> getAllMedico() {
        return ResponseEntity.status(HttpStatus.OK).body(medicoService.findAll());
    }
   
    @PostMapping
	public ResponseEntity<Object> saveMedico(@RequestBody @Valid MedicoDto medicoDto) {
		var medico = new Medico();
		BeanUtils.copyProperties(medicoDto, medico);
		return ResponseEntity.status(HttpStatus.CREATED).body(medicoService.save(medico));
	}


	@SuppressWarnings("rawtypes")
	@GetMapping("/{idprofissional}")
	public ResponseEntity getOneEnfermeiro(@PathVariable(value = "idprofissional") UUID idMedico) {
		Optional<Medico> medicoOptional = medicoService.findById(idMedico);
		if (!medicoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("medico not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(medicoOptional.get());
	}

	@DeleteMapping("/{idprofissional}")
	public ResponseEntity<Object> deleteMedico(@PathVariable(value = "idprofissional") UUID idMedico) {
		Optional<Medico> medicoOptional = medicoService.findById(idMedico);
		if (!medicoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("medico not found.");
		}
		try {
			medicoService.delete(medicoOptional.get());
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			log.error("Erro ao excluir medico:", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir medico.");
		}
	}

	@PutMapping("/{idprofissional}")
	public ResponseEntity<Object> updateMedico(@PathVariable(value = "idprofissional") UUID idMedico,
		@RequestBody @Valid MedicoDto medicoDto) {
		Optional<Medico> medicoOptional = medicoService.findById(idMedico);
		if (!medicoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Medico not found.");
		}
		var medico = new Medico();
		BeanUtils.copyProperties(medicoDto, medico);
		medico.setIdprofissional(medicoOptional.get().getIdprofissional());

		return ResponseEntity.status(HttpStatus.OK).body(medicoService.save(medico));
	}

    
}
