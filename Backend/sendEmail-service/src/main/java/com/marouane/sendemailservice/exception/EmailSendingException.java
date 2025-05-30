package com.marouane.sendemailservice.exception;

import org.springframework.mail.MailException;

public class EmailSendingException extends MailException {

    public EmailSendingException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
