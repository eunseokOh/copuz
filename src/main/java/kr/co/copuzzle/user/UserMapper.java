package kr.co.copuzzle.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import kr.co.copuzzle.vjigsaw.vo.ScoreVO;
import kr.co.copuzzle.vjigsaw.vo.UserVO;

public interface UserMapper {

	List<UserVO> getTest() throws Exception;

	int isJoin(String user_id) throws Exception;

	int userJoin(UserVO userVO) throws Exception;

	int getSeq_user_no(String user_id) throws Exception;

	ArrayList<ScoreVO> getSeq_user_noList(HashMap<String, Object> data) throws Exception;

}
