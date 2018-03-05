package kr.co.copuzzle.score;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.copuzzle.vjigsaw.vo.ScoreVO;

@Service
public class ScoreServiceImpl implements ScoreService {
	
	@Autowired
	ScoreMapper scoreMapper;

	@Override
	public int scoreInsert(ScoreVO scoreVO) throws Exception {
		
		return scoreMapper.scoreInsert(scoreVO);
	}

	@Override
	public ArrayList<ScoreVO> getSelectAll(int level) throws Exception {
		// TODO Auto-generated method stub
		return scoreMapper.getSelectAll(level);
	}
	
}
