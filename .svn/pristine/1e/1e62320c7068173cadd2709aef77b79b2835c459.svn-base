package kr.co.copuzzle.user;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.copuzzle.score.ScoreService;
import kr.co.copuzzle.vjigsaw.vo.ScoreVO;
import kr.co.copuzzle.vjigsaw.vo.UserVO;

@Controller
@RequestMapping("user")
public class UserController {
	
	@Resource
	UserService userService;


	@RequestMapping(value="/test", method=RequestMethod.POST, produces="application/json")
	@ResponseBody
	public List<UserVO> me(){
		List<UserVO> userList = null;
		
		try {
			userList = userService.getTest();
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return userList;
	}
	
	@RequestMapping(value="/login", method=RequestMethod.POST)
	@ResponseBody
	public int login(@ModelAttribute UserVO userVO){
		int userJoin = -1;
		try {
			int isJoin = userService.isJoin(userVO.getUser_id());
			
			if(isJoin == 0){
				userJoin = userService.userJoin(userVO); // 1 == success
			}
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return userJoin;
	}
	
	
	
	
}
