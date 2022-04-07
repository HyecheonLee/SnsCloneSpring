package com.hyecheon.web.validation

import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext

class ListNotEmptyValidator : ConstraintValidator<ListNotEmpty, List<*>> {

    override fun isValid(value: List<*>?, context: ConstraintValidatorContext?): Boolean {
        return !value.isNullOrEmpty()
    }
}