#pragma strict
var target : Transform; 
internal var animator : Animator;
internal var agent : NavMeshAgent;


function Start () { 

	animator = GetComponent(Animator);
	agent = GetComponent(NavMeshAgent);
	
	//agent.destination = target.position;

}

function OnAnimatorMove () {

	var speed : float = agent.velocity.magnitude;
	
	animator.SetFloat("Speed", speed);
	
	var velocity : Vector3 = Quaternion.Inverse(transform.rotation) * agent.desiredVelocity;
	var angle : float = Mathf.Atan2(velocity.x, velocity.z) * 180.0f / 3.14159f;
	
	animator.SetFloat("AV", Mathf.Abs(angle));	
}

function SetTarget (target : Transform) {
	agent.destination = target.position;
}