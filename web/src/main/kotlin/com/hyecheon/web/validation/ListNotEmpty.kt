package com.hyecheon.web.validation

import javax.validation.Constraint
import javax.validation.Payload
import kotlin.reflect.KClass

@Constraint(validatedBy = [ListNotEmptyValidator::class])
@Target(AnnotationTarget.FIELD)
@Retention(value = AnnotationRetention.RUNTIME)
annotation class ListNotEmpty(

    val message: String = "{javax.validation.constraints.ListNotEmpty.message}",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = [],
)
