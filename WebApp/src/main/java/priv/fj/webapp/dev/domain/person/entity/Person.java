package priv.fj.webapp.dev.domain.person.entity;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;

import com.alibaba.fastjson.JSON;

@Alias("Person")
public class Person implements Serializable {
	private static final long serialVersionUID = 3103592869427767789L;

	private Integer id;
	private String name;
	private String age;

	public Person() {
		super();
	}

	public Person(Integer id, String name, String age) {
		super();
		this.id = id;
		this.name = name;
		this.age = age;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	@Override
	public String toString() {
		return JSON.toJSONString(this);
	}

}
