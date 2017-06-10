package priv.fj.webapp.dev.domain.person.dto;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.type.Alias;

@Alias("DeletePerson")
public class DeletePerson {
	
	private List<Integer> ids = new ArrayList<Integer>();

	public List<Integer> getIds() {
		return ids;
	}

	public void setIds(List<Integer> ids) {
		this.ids = ids;
	}

}
