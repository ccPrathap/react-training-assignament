const DisplaySlots = ({ slots }) => <ol className="slots">
  {slots.map(i => <li key={i.session_id}>At <b>{i.name}</b> the vaccine <b>{i.vaccine}</b> availability is: {i.available_capacity_dose1}</li>)}
</ol>;

export default DisplaySlots;