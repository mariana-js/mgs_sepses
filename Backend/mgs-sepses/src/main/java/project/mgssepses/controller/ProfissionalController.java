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
import project.mgssepses.dtos.ProfissionalDto;
import project.mgssepses.model.Profissional;
import project.mgssepses.service.ProfissionalService;


@RestController
@RequestMapping("/profissional")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfissionalController {
	final ProfissionalService profissionalService;
    private final Logger log = LoggerFactory.getLogger(ProfissionalController.class);

	public ProfissionalController(ProfissionalService profissionalService) {
		this.profissionalService = profissionalService;
	}

    @GetMapping
    public ResponseEntity<List<Profissional>> getAllProfissional() {
        return ResponseEntity.status(HttpStatus.OK).body(profissionalService.findAll());
    }
	
	@PostMapping
	public ResponseEntity<Object> saveProfissional(@RequestBody @Valid ProfissionalDto profissionalDto) {
		var profissional = new Profissional();
		BeanUtils.copyProperties(profissionalDto, profissional);
		return ResponseEntity.status(HttpStatus.CREATED).body(profissionalService.save(profissional));
	}


	@SuppressWarnings("rawtypes")
	@GetMapping("/{idProfissional}")
	public ResponseEntity getOneProfissional(@PathVariable(value = "idProfissional") UUID idprofissional) {
		Optional<Profissional> profissionalOptional = profissionalService.findById(idprofissional);
		if (!profissionalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profissional not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(profissionalOptional.get());
	}

	@DeleteMapping("/{idprofissional}")
	public ResponseEntity<Object> deleteProfissional(@PathVariable(value = "idprofissional") UUID idprofissional) {
		Optional<Profissional> profissionalOptional = profissionalService.findById(idprofissional);
		if (!profissionalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profissional not found..");
		}
		try {
			profissionalService.delete(profissionalOptional.get());
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			log.error("Erro ao excluir profissional:", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir profissional.");
		}
	}

	@PutMapping("/{idprofissional}")
	public ResponseEntity<Object> updateProfissional(@PathVariable(value = "idprofissional") UUID idprofissional,
		@RequestBody @Valid ProfissionalDto profissionalDto) {
		Optional<Profissional> profissionalOptional = profissionalService.findById(idprofissional);
		if (!profissionalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Profissional not found.");
		}
		var profissional = new Profissional();
		BeanUtils.copyProperties(profissionalDto, profissional);
		profissional.setIdProfissional(profissionalOptional.get().getIdProfissional());

		return ResponseEntity.status(HttpStatus.OK).body(profissionalService.save(profissional));
	}
}
