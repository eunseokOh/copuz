package kr.co.copuzzle.user;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.copuzzle.vjigsaw.vo.ScoreVO;
import kr.co.copuzzle.vjigsaw.vo.UserVO;

@Service
public class UserServiceImpl implements UserService{
	@Autowired
	UserMapper userMapper;
	
	@Override
	public List<UserVO> getTest() throws Exception {
		
		return userMapper.getTest();
	}

	@Override
	public int isJoin(String user_id) throws Exception {
		return userMapper.isJoin(user_id);
	}

	@Override
	public int userJoin(UserVO userVO) throws Exception {
		return userMapper.userJoin(userVO);
	}

	@Override
	public int getSeq_user_no(String user_id) throws Exception {
		
		return userMapper.getSeq_user_no(user_id);
	}

	@Override
	public ArrayList<ScoreVO> getSeq_user_noList(HashMap<String, Object> data) throws Exception {
		// TODO Auto-generated method stub
		return userMapper.getSeq_user_noList(data);
	}

}
