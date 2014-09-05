var leftRange : float =0.0;
var rightRange : float =0.0;
var delay : float = 0.0;
var offset = 0.0;

private var zPos : float;
private var leftPos : float;
private var rightPos : float;


var speed : float = 0.2;

function Start () {

	//print (transform.position.z);
	zPos = transform.position.z;


}

function FixedUpdate () {

		leftPos = zPos - leftRange;
		rightPos = zPos + rightRange;
		var weight = Mathf.Cos((Time.time + delay) * speed * 2 * Mathf.PI) * 0.5 + 0.5;
		transform.position.z = leftPos * (1-weight) + rightPos * weight - offset;

}
