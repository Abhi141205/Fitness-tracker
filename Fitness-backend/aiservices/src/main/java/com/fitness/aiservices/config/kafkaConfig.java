
package com.fitness.aiservices.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.listener.DefaultErrorHandler;
import org.springframework.util.backoff.FixedBackOff;

@Configuration
public class kafkaConfig {

    @Bean
    public DefaultErrorHandler errorHandler() {

        // Wait 5 seconds before retrying
        // Retry 3 times
        FixedBackOff backOff = new FixedBackOff(
                5000L,
                3
        );

        return new DefaultErrorHandler(backOff);
    }
}