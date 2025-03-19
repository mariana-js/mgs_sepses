package project.mgssepses.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import project.mgssepses.dtos.LogDto;
import project.mgssepses.model.LogModel;
import project.mgssepses.service.LogService;

@RestController
@RequestMapping("/log")
public class LogController {
    final LogService logService;


	@SuppressWarnings("unused")
	private static final Logger logger = LoggerFactory.getLogger(LogController.class);

    public LogController(LogService logService) {
            this.logService = logService;
    }

    @GetMapping
    public ResponseEntity<List<LogModel>> getAllLogs() {
        return ResponseEntity.status(HttpStatus.OK).body(logService.findAll());
    }
	// @PostMapping
	// public ResponseEntity<Object> saveLog(@RequestBody @Valid LogDto logDto) {
	// 	System.out.println("📌 Recebendo log no backend: " + logDto);
	
	// 	try {
	// 		var logg = new LogModel();
	// 		BeanUtils.copyProperties(logDto, logg);
			
	// 		LogModel savedLog = logService.save(logg);
			
	// 		System.out.println("✅ Log salvo com sucesso: " + savedLog);
			
	// 		return ResponseEntity.status(HttpStatus.CREATED).body(savedLog);
	// 	} catch (Exception e) {
	// 		System.err.println("❌ Erro ao salvar log: " + e.getMessage());
	// 		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar log.");
	// 	}
	// }
	
    @PostMapping
	public ResponseEntity<Object> saveLog(@RequestBody @Valid LogDto logDto) {
		var logg = new LogModel();
		BeanUtils.copyProperties(logDto, logg);
		return ResponseEntity.status(HttpStatus.CREATED).body(logService.save(logg));
	}

    @SuppressWarnings("rawtypes")
	@GetMapping("/{id_log}")
	public ResponseEntity getOneProfissional(@PathVariable(value = "id_log") UUID idlog) {
		Optional<LogModel> logOptional = logService.findById(idlog);
		if (!logOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Log not found.");
		}
		return ResponseEntity.status(HttpStatus.OK).body(logOptional.get());
	}

}
