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
import project.mgssepses.dtos.PacienteDto;
import project.mgssepses.model.Paciente;
import project.mgssepses.service.PacienteService;

@RestController
@RequestMapping("/paciente")
@CrossOrigin(origins = "http://localhost:4200")
public class PacienteController {
    final PacienteService pacienteService;

    private final Logger log = LoggerFactory.getLogger(PacienteController.class);
    public PacienteController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

     @GetMapping
    public ResponseEntity<List<Paciente>> getAllPaciente() {
        return ResponseEntity.status(HttpStatus.OK).body(pacienteService.findAll());
    }
	
	@PostMapping
	public ResponseEntity<Object> savePaciente(@RequestBody @Valid PacienteDto pacienteDto) {
		var paciente = new Paciente();
		BeanUtils.copyProperties(pacienteDto, paciente);
		return ResponseEntity.status(HttpStatus.CREATED).body(pacienteService.save(paciente));
	}


	@SuppressWarnings("rawtypes")
	@GetMapping("/{idpaciente}")
	public ResponseEntity getOnePaciente(@PathVariable(value = "idpaciente") UUID idpaciente) {
		Optional<Paciente> pacienteOptional = pacienteService.findById(idpaciente);
		if (!pacienteOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("paciente not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(pacienteOptional.get());
	}

	@DeleteMapping("/{idpaciente}")
	public ResponseEntity<Object> deletePaciente(@PathVariable(value = "idpaciente") UUID idpaciente) {
		Optional<Paciente> pacienteOptional = pacienteService.findById(idpaciente);
		if (!pacienteOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("paciente not found..");
		}
		try {
			pacienteService.delete(pacienteOptional.get());
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			log.error("Erro ao excluir paciente:", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir paciente.");
		}
	}

	@PutMapping("/{idpaciente}")
	public ResponseEntity<Object> updatePaciente(@PathVariable(value = "idpaciente") UUID idpaciente,
		@RequestBody @Valid PacienteDto pacienteDto) {
		Optional<Paciente> pacienteOptional = pacienteService.findById(idpaciente);
		if (!pacienteOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Paciente not found.");
		}
		var paciente = new Paciente();
		BeanUtils.copyProperties(pacienteDto, paciente);
		paciente.setIdPaciente(pacienteOptional.get().getIdPaciente());

		return ResponseEntity.status(HttpStatus.OK).body(pacienteService.save(paciente));
	}
}
