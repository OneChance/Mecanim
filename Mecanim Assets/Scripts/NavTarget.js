#pragma strict


var agent : GameObject;

function OnMouseDown () {

	agent.SendMessage("SetTarget", this.transform);
}