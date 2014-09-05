#pragma strict

var character : Transform;
var spawnPoint : Transform;
internal var positionPoint : Vector3;

function Start () {

	if (!spawnPoint) positionPoint = character.transform.position;
	else positionPoint = spawnPoint.transform.position;
}


function OnTriggerEnter (victim : Collider) {

	yield new WaitForSeconds(.5);
	victim.transform.position = positionPoint;
	
	// stop user input for 1 second after landing

}
