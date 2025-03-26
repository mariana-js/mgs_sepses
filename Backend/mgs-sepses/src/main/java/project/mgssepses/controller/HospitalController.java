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
import project.mgssepses.dtos.HospitalDto;
import project.mgssepses.model.Hospital;
import project.mgssepses.service.HospitalService;

import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
@RequestMapping("/hospital")
@CrossOrigin(origins = "http://localhost:4200")
public class HospitalController {
   	final HospitalService hospitalService;
    private final Logger log = LoggerFactory.getLogger(HospitalController.class);

    public HospitalController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    @GetMapping
    public ResponseEntity<List<Hospital>> getAllHospital() {
        return ResponseEntity.status(HttpStatus.OK).body(hospitalService.findAll());
    }
	
	@PostMapping
	public ResponseEntity<Object> saveHospital(@RequestBody @Valid HospitalDto hospitalDto) {
		var hospital = new Hospital();
		BeanUtils.copyProperties(hospitalDto, hospital);
		return ResponseEntity.status(HttpStatus.CREATED).body(hospitalService.save(hospital));
	}


	@SuppressWarnings("rawtypes")
	@GetMapping("/{idHospital}")
	public ResponseEntity getOneHospital(@PathVariable(value = "idHospital") UUID idHospital) {
		Optional<Hospital> hospitalOptional = hospitalService.findById(idHospital);
		if (!hospitalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hospital not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(hospitalOptional.get());
	}

	@DeleteMapping("/{idHospital}")
	public ResponseEntity<Object> deleteProfissional(@PathVariable(value = "idHospital") UUID idHospital) {
		Optional<Hospital> hospitalOptional = hospitalService.findById(idHospital);
		if (!hospitalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hospital not found.");
		}
		try {
			hospitalService.delete(hospitalOptional.get());
			return ResponseEntity.noContent().build();
		} catch (Exception e) {
			log.error("Erro ao excluir hospital:", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao excluir hospital.");
		}
	}

	@PutMapping("/{idHospital}")
	public ResponseEntity<Object> updateProfissional(@PathVariable(value = "idHospital") UUID idHospital,
		@RequestBody @Valid HospitalDto hospitalDto) {
		Optional<Hospital> hospitalOptional = hospitalService.findById(idHospital);
		if (!hospitalOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Hospital not found.");
		}
		var hospital = new Hospital();
		BeanUtils.copyProperties(hospitalDto, hospital);
		hospital.setIdHospital(hospitalOptional.get().getIdHospital());

		return ResponseEntity.status(HttpStatus.OK).body(hospitalService.save(hospital));
	}
}
