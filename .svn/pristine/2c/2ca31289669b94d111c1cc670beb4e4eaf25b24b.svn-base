package kr.co.copuzzle.score;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.copuzzle.user.UserService;
import kr.co.copuzzle.vjigsaw.vo.ScoreVO;
import kr.co.copuzzle.vjigsaw.vo.UserVO;

@Controller
@RequestMapping("score")
public class ScoreController {
	
	@Resource
	UserService userService;
	
	@Resource
	ScoreService scoreService;

	@RequestMapping(value="/insert", method=RequestMethod.POST)
	@ResponseBody
	public int scoreInsert(@RequestParam HashMap<String, Object> param){
		String user_id = (String)param.get("user_id");
		double score = new Double(param.get("score").toString());
		int level = new Integer(param.get("level").toString());
		int seq_user_no = -1;
		int socreInsert = -1;
		
		try {
			seq_user_no = userService.getSeq_user_no(user_id);
			ScoreVO scoreVO = new ScoreVO();
			scoreVO.setLevel(level);
			scoreVO.setScore(score);
			scoreVO.setSeq_user_no(seq_user_no);
			
			socreInsert = scoreService.scoreInsert(scoreVO);
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return socreInsert;
	}
	
	@RequestMapping(value="/select_all/{level}", method=RequestMethod.POST, produces="application/json")
	@ResponseBody
	public ArrayList<ScoreVO> selectAll(@PathVariable int level){
		ArrayList<ScoreVO> scoreVOlist = new ArrayList<ScoreVO>();
		
		try {
			scoreVOlist = scoreService.getSelectAll(level);
			
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return scoreVOlist;
	}
	
	@RequestMapping(value="/select_fbfriends", method=RequestMethod.POST, produces="application/json")
	@ResponseBody
	public ArrayList<ScoreVO> selectFBfriends(@RequestBody List<HashMap<String, Object>> list){
		
		ArrayList<ScoreVO>  scoreVOlist = new ArrayList<ScoreVO>();
		System.out.println(list);
		
		HashMap<String, Object> data = new HashMap<String, Object>();
		
		data.put("list", list);
		
		try {
			scoreVOlist = userService.getSeq_user_noList(data);
			System.out.println(scoreVOlist);
		} catch (Exception e) {
			
			e.printStackTrace();
		}
		
		return scoreVOlist;
		
	}
}
