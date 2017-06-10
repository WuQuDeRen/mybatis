package priv.fj.webapp.commons.domain.dto;

import java.io.Serializable;

public class AjaxMsg implements Serializable {
	private static final long serialVersionUID = -1721248760308722693L;
	
	private String result;
	private String content;

	public AjaxMsg() {
		super();
	}

	public AjaxMsg(String result, String content) {
		super();
		this.result = result;
		this.content = content;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		this.result = result;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}
