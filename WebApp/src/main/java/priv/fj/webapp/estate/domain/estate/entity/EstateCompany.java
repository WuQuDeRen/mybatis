package priv.fj.webapp.estate.domain.estate.entity;

import java.util.List;

import org.apache.ibatis.type.Alias;

import priv.fj.webapp.construction.domain.community.entity.Community;

@Alias("EstateCompany")
public class EstateCompany {
	private Integer companyId;
	private String companyName;
	private String companyDes;
	private String contactNum;
	private String email;
	private String contactName;
	private String address;
	private List<Community> community;
	private Integer salesId;

	public EstateCompany() {
		super();
	}


	public Integer getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getCompanyDes() {
		return companyDes;
	}

	public void setCompanyDes(String companyDes) {
		this.companyDes = companyDes;
	}

	public String getContactNum() {
		return contactNum;
	}

	public void setContactNum(String contactNum) {
		this.contactNum = contactNum;
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

	public Integer getSalesId() {
		return salesId;
	}

	public void setSalesId(Integer salesId) {
		this.salesId = salesId;
	}
	
}
