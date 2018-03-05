package kr.co.copuzzle.vjigsaw.vo;

public class FriendsVO {
	int seq_friends_no;
	int seq_user_no;
	String friend_id;
	String friend_name;
	
	@Override
	public String toString() {
		return "friendsVO [seq_friends_no=" + seq_friends_no + ", seq_user_no=" + seq_user_no + ", friend_id="
				+ friend_id + ", friend_name=" + friend_name + "]";
	}
	
	public int getSeq_friends_no() {
		return seq_friends_no;
	}
	public void setSeq_friends_no(int seq_friends_no) {
		this.seq_friends_no = seq_friends_no;
	}
	public int getSeq_user_no() {
		return seq_user_no;
	}
	public void setSeq_user_no(int seq_user_no) {
		this.seq_user_no = seq_user_no;
	}
	public String getFriend_id() {
		return friend_id;
	}
	public void setFriend_id(String friend_id) {
		this.friend_id = friend_id;
	}
	public String getFriend_name() {
		return friend_name;
	}
	public void setFriend_name(String friend_name) {
		this.friend_name = friend_name;
	}
}
