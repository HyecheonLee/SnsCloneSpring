package com.hyecheon.domain.entity.post

import com.hyecheon.domain.entity.BaseEntity
import com.hyecheon.domain.entity.reply.Reply
import com.hyecheon.domain.entity.user.User
import org.hibernate.Hibernate
import org.springframework.data.annotation.CreatedBy
import org.springframework.data.jpa.domain.support.AuditingEntityListener
import javax.persistence.*

/**
 * User: hyecheon lee
 * Email: rainbow880616@gmail.com
 * Date: 2022/02/26
 */
@EntityListeners(AuditingEntityListener::class)
@Table(name = "posts")
@Entity
class Post(
	@Lob @Column
	var content: String? = null,
) : BaseEntity() {

	@ManyToOne
	@JoinColumn(name = "username", referencedColumnName = "username")
	var postedBy: User? = null

	@Transient
	var userLike: Boolean = false

	@OneToOne(mappedBy = "post", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
	var postStatus: PostStatus? = null

	@OneToMany(mappedBy = "post", cascade = [CascadeType.ALL])
	var replies: MutableSet<Reply> = mutableSetOf()

	fun like() = run {
		if (postStatus == null) {
			postStatus = PostStatus(this)
		}
		postStatus?.like()
	}


	fun unLike() = run {
		if (postStatus == null) {
			postStatus = PostStatus(this)
		}
		postStatus?.unLike()
	}

	fun reply() {
		if (postStatus == null) {
			postStatus = PostStatus(this)
		}
		postStatus?.reply()
	}

	fun unReply() {
		if (postStatus == null) {
			postStatus = PostStatus(this)
		}
		postStatus?.unReply()
	}

	override fun equals(other: Any?): Boolean {
		if (this === other) return true
		if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
		other as Post

		return id != null && id == other.id
	}

	override fun hashCode(): Int = javaClass.hashCode()

}