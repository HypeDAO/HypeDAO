#!/bin/bash

rm -rf /tmp/near-sandbox

packages/near-sandbox/target/debug/near-sandbox --home /tmp/near-sandbox init
packages/near-sandbox/target/debug/near-sandbox --home /tmp/near-sandbox run
