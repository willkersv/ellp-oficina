package com.ellp.certificado;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

public class CertificadoApplicationTests {

	@Test
    void testIfTrueCondition() {
        int a = 5;
        int b = 10;
        assertTrue(a < b, "A deve ser menor que B");
    }

    @Test
    void testIfFalseCondition() {
        int a = 10;
        int b = 5;
        assertFalse(a < b, "A não deve ser menor que B");
    }

    @Test
    void testEquality() {
        String str1 = "Hello";
        String str2 = "Hello";
        assertTrue(str1.equals(str2), "As strings devem ser iguais");
    }

    @Test
    void testInequality() {
        String str1 = "Hello";
        String str2 = "World";
        assertFalse(str1.equals(str2), "As strings não devem ser iguais");
    }

}
