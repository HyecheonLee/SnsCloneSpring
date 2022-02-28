package com.hyecheon.web.dto.user

import com.hyecheon.domain.dto.user.UserConverter
import com.hyecheon.domain.entity.user.User
import org.mapstruct.factory.Mappers
import javax.validation.constraints.NotBlank

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
object UserReqDto {
	private val converter = Mappers.getMapper(UserConverter::class.java)


	data class Join(
		var firstName: String? = null,
		var lastName: String? = null,
		var username: String? = null,
		var email: String? = null,
		var password: String? = null,
	) {
		fun toEntity(): User = converter.toEntity(this)
	}

	data class Login(
		@field:NotBlank(message = "사용자 이름은 필수 입니다.")
		var username: String? = null,
		@field:NotBlank(message = "비밀번호는 필수 입니다.")
		var password: String? = null,
	)
}