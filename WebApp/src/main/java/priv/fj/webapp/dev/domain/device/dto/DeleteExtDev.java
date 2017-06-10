package priv.fj.webapp.dev.domain.device.dto;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.type.Alias;

@Alias("DeleteExtDev")
public class DeleteExtDev {
	private List<Integer> ids = new ArrayList<Integer>();

	public List<Integer> getIds() {
		return ids;
	}

	public void setIds(List<Integer> ids) {
		this.ids = ids;
	}
	
	public List<Integer> add(Integer id) {
		ids.add(id);
		return ids;
	}
	
}
