package project.mgssepses.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import project.mgssepses.dtos.EnfermeiroDto;
import project.mgssepses.model.Enfermeiro;
import project.mgssepses.service.EnfermeiroService;

@RestController
@RequestMapping("/profissional/enfermeiro")
@CrossOrigin(origins = "http://localhost:4200")
public class EnfermeiroController {

   final EnfermeiroService enfermeiroService;

    private final Logger log = LoggerFactory.getLogger(EnfermeiroController.class);
    public EnfermeiroController(EnfermeiroService enfermeiroService) {
        this.enfermeiroService = enfermeiroService;
    }

    @GetMapping
    public ResponseEntity<List<Enfermeiro>> getAllEnfermeiro() {
        return ResponseEntity.status(HttpStatus.OK).body(enfermeiroService.findAll());
    }
   
    @PostMapping
	public ResponseEntity<Object> saveEnfermeiro(@RequestBody @Valid EnfermeiroDto enfermeiroDto) {
		var enfermeiro = new Enfermeiro();
		BeanUtils.copyProperties(enfermeiroDto, enfermeiro);
		return ResponseEntity.status(HttpStatus.CREATED).body(enfermeiroService.save(enfermeiro));
	}


	@SuppressWarnings("rawtypes")
	@GetMapping("/{idprofissional}")
	public ResponseEntity getOneEnfermeiro(@PathVariable(value = "idprofissional") UUID idEnfermeiro) {
		Optional<Enfermeiro> enfermeiroOptional = enfermeiroService.findById(idEnfermeiro);
		if (!enfermeiroOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("enfermeiro not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(enfermeiroOptional.get());
	}

	@DeleteMapping("/{idprofissional}")
	public ResponseEntity<Object> deleteEnfermeiro(@PathVariable(value = "idprofissional") UUID idEnfermeiro) {
		Optional<Enfermeiro> enfermeiroOptional = enfermeiroService.findById(idEnfermeiro);
		if (!enfermeiroOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("enfermeiro not found.");
		}
		try {
			enfermeiroService.delete(enfermeiroOptional.get());
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			log.error("Erro ao excluir enfermeiro:", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir enfermeiro.");
		}
	}

	@PutMapping("/{idprofissional}")
	public ResponseEntity<Object> updateEnfermeiro(@PathVariable(value = "idprofissional") UUID idEnfermeiro,
		@RequestBody @Valid EnfermeiroDto enfermeiroDto) {
		Optional<Enfermeiro> enfermeiroOptional = enfermeiroService.findById(idEnfermeiro);
		if (!enfermeiroOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Enfermeiro not found.");
		}
		var enfermeiro = new Enfermeiro();
		BeanUtils.copyProperties(enfermeiroDto, enfermeiro);
		enfermeiro.setIdprofissional(enfermeiroOptional.get().getIdprofissional());

		return ResponseEntity.status(HttpStatus.OK).body(enfermeiroService.save(enfermeiro));
	}
}
