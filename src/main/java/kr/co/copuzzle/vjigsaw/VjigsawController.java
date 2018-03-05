package kr.co.copuzzle.vjigsaw;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class VjigsawController {
	private static final Logger logger = LoggerFactory.getLogger(VjigsawController.class);
	
	@RequestMapping(value="/vjigsaw")
	public String vjigsaw(){
		
		
		return "vjigsaw/main";
	}
	
	@RequestMapping(value="/test")
	public String test(){
		
		
		return "vjigsaw/test";
	}
	
	@RequestMapping(value="/make")
	public String eunseokmake(){
		
		
		return "vjigsaw/eunseokmake";
	}
	
	@RequestMapping(value="/remake")
	public String remake(){
		return "vjigsaw/remake";
	}
	
	@RequestMapping(value="/remake/splash")
	public String remake_splash(){
		return "vjigsaw/remake_splash";
	}
	
	@RequestMapping(value="/remake/play")
	public String remake_game(){
		return "vjigsaw/remake_play";
	}
	
	@RequestMapping(value="/remake/newplay")
	public String remake_newgame(){
		return "vjigsaw/remake_newplay";
	}
}
