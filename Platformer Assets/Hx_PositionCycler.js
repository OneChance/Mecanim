var leftRange : float =0.0;
var rightRange : float =0.0;
var delay : float = 0.0;
var offset = 0.0;

private var xPos : float;
private var leftPos : float;
private var rightPos : float;


var speed : float = 0.2;

function Start () {

	//print (transform.position.x);
	xPos = transform.position.x;


}

function FixedUpdate () {

		leftPos = xPos - leftRange;
		rightPos = xPos + rightRange;
		var weight = Mathf.Cos((Time.time + delay) * speed * 2 * Mathf.PI) * 0.5 + 0.5;
		transform.position.x = leftPos * (1-weight) + rightPos * weight - offset;

}
