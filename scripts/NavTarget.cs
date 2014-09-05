using UnityEngine;
using System.Collections;

public class NavTarget : MonoBehaviour
{

		public NavMeshAgent agent;

		void OnMouseDown ()
		{
				agent.SendMessage ("SetTarget", transform);
		}
}
