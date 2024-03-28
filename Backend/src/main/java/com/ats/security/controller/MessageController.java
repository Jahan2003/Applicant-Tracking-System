package com.ats.security.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ats.security.dto.request.MessageRequest;
import com.ats.security.service.MessageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class MessageController {
	private MessageService messageService;
	 @Autowired
	    public MessageController(MessageService messageService) {
	        this.messageService = messageService;
	    }
	@PostMapping("/publishString")
	public ResponseEntity<String> sendMessage(@RequestBody MessageRequest messageRequest){
		messageService.sendMessage(messageRequest);
		return ResponseEntity.status(HttpStatus.OK).body("Message sent to rabbitmq successfully!");
	}
	
	@PostMapping("/publishJson")
	public ResponseEntity<String> sendJsonMessage(@RequestBody MessageRequest messageRequest){
		messageService.sendJsonMessage(messageRequest);
		return ResponseEntity.status(HttpStatus.OK).body("Message sent to rabbitmq successfully!");
	}
}
