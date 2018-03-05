package kr.co.copuzzle.vjigsaw.vo;


import java.sql.Date;
import java.util.List;

public class UserVO {
	int seq_user_no;
	String user_id    ;
	String user_name  ;
	Date user_date  ;
	List<UserVO> userListVO;
	
	public List<UserVO> getUserListVO() {
		return userListVO;
	}

	public void setUserListVO(List<UserVO> userListVO) {
		this.userListVO = userListVO;
	}

	@Override
	public String toString() {
		return "UserVO [seq_user_no=" + seq_user_no + ", user_id=" + user_id + ", user_name=" + user_name
				+ ", user_date=" + user_date + ", userListVO=" + userListVO + "]";
	}

	public int getSeq_user_no() {
		return seq_user_no;
	}
	public void setSeq_user_no(int seq_user_no) {
		this.seq_user_no = seq_user_no;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public Date getUser_date() {
		return user_date;
	}
	public void setUser_date(Date user_date) {
		this.user_date = user_date;
	}
}
