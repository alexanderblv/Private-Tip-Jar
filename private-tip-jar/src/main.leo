program private_tip_jar.aleo;

// A private record representing a tip jar balance owned by an address
record Jar {
	owner: address,
	balance: u64,
}

// A private record representing a single tip note destined for a jar owner
record TipNote {
	to: address,
	amount: u64,
}

// Initialize a new empty jar for the caller
transition create_jar() -> Jar {
	let caller: address = caller;
	let jar: Jar = Jar { owner: caller, balance: 0u64 };
	return jar;
}

// Send a private tip by creating a TipNote; in a real app this would transfer credits or a token
transition send_tip(to: address, amount: u64) -> TipNote {
	// Amount must be positive
	assert(amount > 0u64);
	let note: TipNote = TipNote { to, amount };
	return note;
}

// Claim a tip note into a jar (aggregate balances privately)
transition claim_tip(note: TipNote, mut jar: Jar) -> Jar {
	// Only the owner can claim into their jar
	assert(note.to == jar.owner);
	jar.balance = jar.balance + note.amount;
	return jar;
}