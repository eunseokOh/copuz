package kr.co.copuzzle.vjigsaw.vo;

import java.sql.Date;

public class ScoreVO {
	String user_name; //tab_user와 join할 때 사용
	String user_id; //tab_user와 join할 때 사용
	int seq_score_no;
	int seq_user_no;
	int level;
	double score;
	Date score_date;
	public int getSeq_score_no() {
		return seq_score_no;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public void setSeq_score_no(int seq_score_no) {
		this.seq_score_no = seq_score_no;
	}
	public int getSeq_user_no() {
		return seq_user_no;
	}
	public void setSeq_user_no(int seq_user_no) {
		this.seq_user_no = seq_user_no;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public double getScore() {
		return score;
	}
	public void setScore(double score) {
		this.score = score;
	}
	public Date getScore_date() {
		return score_date;
	}
	public void setScore_date(Date score_date) {
		this.score_date = score_date;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	@Override
	public String toString() {
		return "ScoreVO [user_name=" + user_name + ", user_id=" + user_id + ", seq_score_no=" + seq_score_no
				+ ", seq_user_no=" + seq_user_no + ", level=" + level + ", score=" + score + ", score_date="
				+ score_date + "]";
	}
	
}
