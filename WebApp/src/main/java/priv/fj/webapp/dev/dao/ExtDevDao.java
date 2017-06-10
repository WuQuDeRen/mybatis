package priv.fj.webapp.dev.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import priv.fj.webapp.dev.domain.device.dto.DeleteExtDev;
import priv.fj.webapp.dev.domain.device.entity.ExtDev;
import priv.fj.webapp.dev.domain.person.dto.SearchDev;

@Repository
public interface ExtDevDao {
	int insert(ExtDev dev);

	int update(ExtDev dev);

	int delete(DeleteExtDev dev);

	ExtDev get(SearchDev dev);
	
	List<ExtDev> getList(SearchDev dev);

}
