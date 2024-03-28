package com.ats.security.service;

import org.springframework.stereotype.Service;

import com.ats.security.dto.request.MessageRequest;
import com.ats.security.publisher.RabbitMQProducer;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MessageService {
	private final RabbitMQProducer producer;
	
	public void sendMessage(MessageRequest messageRequest) {
		producer.sendMessage(messageRequest.getMessage());
	}

	public void sendJsonMessage(MessageRequest messageRequest) {
		producer.sendJsonMessage(messageRequest);
	}
}
