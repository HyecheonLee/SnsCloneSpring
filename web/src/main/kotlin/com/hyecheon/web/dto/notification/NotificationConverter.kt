package com.hyecheon.web.dto.notification

import com.hyecheon.domain.entity.notification.Notification
import org.mapstruct.Mapper
import org.mapstruct.Mapping
import org.mapstruct.NullValuePropertyMappingStrategy
import org.mapstruct.ReportingPolicy
import org.mapstruct.factory.Mappers

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/04/10
 */
@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE,
	nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
abstract class NotificationConverter {
	companion object {
		val converter = Mappers.getMapper(NotificationConverter::class.java)
	}

	@Mapping(source = "toUserId", target = "toUserId")
	abstract fun toModel(entity: Notification): NotificationDto.Model
}