package priv.fj.webapp.estate.domain.sale.entity;

import java.io.Serializable;

import org.apache.ibatis.type.Alias;

@Alias("Sales")
public class Sales implements Serializable {
	private static final long serialVersionUID = 1L;
	private Integer salesId;
	private String salesComName;
	private String salesDescription;
	private String contactNumber;
	private String email;
	private String contactName;
	private String address;


	public Integer getSalesId() {
		return salesId;
	}

	public void setSalesId(Integer salesId) {
		this.salesId = salesId;
	}

	public String getSalesComName() {
		return salesComName;
	}

	public void setSalesComName(String salesComName) {
		this.salesComName = salesComName;
	}

	public String getSalesDescription() {
		return salesDescription;
	}

	public void setSalesDescription(String salesDescription) {
		this.salesDescription = salesDescription;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}


}
