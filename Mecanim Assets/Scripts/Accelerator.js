#pragma strict
var animator : Animator;
var speed : float = 0.0;
var moving : boolean; 

function Start () {

	animator = GetComponent(Animator);
}

function Update () {


if (Input.GetAxis("Fire1")) moving = true;

}


function OnAnimatorMove()  {

  if (moving) {
	speed += 0.03;
	
	transform.Translate(new Vector3(0,0,Time.deltaTime*speed)); 

	if (speed >  10.0) {
		moving = false;
		speed = 0.0;
	}
	
	
	animator.SetFloat("Speed", speed);

   }
}
