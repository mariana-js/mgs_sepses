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
import project.mgssepses.dtos.RiscoSepseDto;
import project.mgssepses.model.RiscoSepse;
import project.mgssepses.service.RiscoSepseService;

import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@RequestMapping("/paciente/risco_sepse")
@CrossOrigin(origins = "http://localhost:4200")
public class RiscoSepseController {
    final RiscoSepseService riscoService;
    private final Logger log = LoggerFactory.getLogger(RiscoSepseController.class);
    
    public RiscoSepseController(RiscoSepseService riscoService) {
        this.riscoService = riscoService;
    }

    @GetMapping
    public  ResponseEntity<List<RiscoSepse>> getAllRisco() {
        return ResponseEntity.status(HttpStatus.OK).body(riscoService.findAll());
    }

    @PostMapping
	public ResponseEntity<Object> saveRisco(@RequestBody @Valid RiscoSepseDto riscoDto) {
		var risco = new RiscoSepse();
		BeanUtils.copyProperties(riscoDto, risco);
		return ResponseEntity.status(HttpStatus.CREATED).body(riscoService.save(risco));
	}

    @SuppressWarnings("rawtypes")
	@GetMapping("/{id}")
	public ResponseEntity getOneRisco(@PathVariable(value = "id") UUID id) {
		Optional<RiscoSepse> riscoOptional = riscoService.findById(id);
		if (!riscoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Risco Sepse not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(riscoOptional.get());
	}

    @DeleteMapping("/{id}")
	public ResponseEntity<Object> deleteRisco(@PathVariable(value = "id") UUID id) {
		Optional<RiscoSepse> riscoOptional = riscoService.findById(id);
		if (!riscoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Risco sepse not found.");
		}
		try {
			riscoService.delete(riscoOptional.get());
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			log.error("Erro ao excluir risco sepse:", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir risco sepse.");
		}
	}

    @PutMapping("/{id}")
	public ResponseEntity<Object> updateRisco(@PathVariable(value = "id") UUID id,
		@RequestBody @Valid RiscoSepseDto riscoSepseDto) {
		Optional<RiscoSepse> riscoOptional = riscoService.findById(id);
		if (!riscoOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Risco sepse not found.");
		}
		var risco = new RiscoSepse();
		BeanUtils.copyProperties(riscoSepseDto, risco);
		risco.setId(riscoOptional.get().getId());

		return ResponseEntity.status(HttpStatus.OK).body(riscoService.save(risco));
	}

}
