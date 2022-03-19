package com.hyecheon.domain.entity.upload_file

import com.hyecheon.domain.entity.BaseEntity
import com.hyecheon.domain.entity.user.User
import org.hibernate.Hibernate
import javax.persistence.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/03/19
 */
@Entity
class UploadFile(
	var path: String,
	var extension: String,
	var fileSize: Long,
	@Enumerated(EnumType.STRING)
	var type: FileType? = null,
	var isShow: Boolean = false,
	var createdBy: String,
) : BaseEntity() {
	override fun equals(other: Any?): Boolean {
		if (this === other) return true
		if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
		other as UploadFile

		return id != null && id == other.id
	}

	override fun hashCode(): Int = javaClass.hashCode()

}