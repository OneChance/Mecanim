#pragma strict

internal var animator : Animator; // var to store the animator component 
var v : float; // variable to hold user vertical input
var h : float; // variable to hold user horizontal input, turns
var rotSpeed : float = 90;
internal var layers : int; // layers in the Animator


function Start () {

	animator = GetComponent(Animator); // assign the Animator component
	layers = animator.layerCount;
	
	if (layers >= 2) {
	    for (var i : int = 1; i < layers; i++ ) { 
	          animator.SetLayerWeight(i, 1);
	    }
	}
}

function Update () {

	v = Input.GetAxis("Vertical");
	h = Input.GetAxis("Horizontal");
}

function FixedUpdate () {

	// Set the V Input parameter to the V axis value
	animator.SetFloat ("V Input", v);
   
	// rotate the character according to input and rotation speed
	transform.Rotate (new Vector3(0,h*Time.deltaTime*rotSpeed,0)); 

}


