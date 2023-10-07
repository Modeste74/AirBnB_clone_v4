#!/usr/bin/env bash

set -e

SCRIPTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOTDIR="$(git -C "$SCRIPTDIR" rev-parse --show-toplevel)"

set -x

cat > "${ROOTDIR}/AUTHORS" <<- EOF
	# This is the pre-fill content before the contents. DO NOT EDIT, PLEASE!
	# This file is a list of all contributors to the repository.
	#
	$(git -C "$ROOTDIR" log --format='%aN <%aE>' | LC_ALL=C.UTF-8 sort -uf)
EOF
