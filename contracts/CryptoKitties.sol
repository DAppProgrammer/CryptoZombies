// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CryptoKitties {
    string[3] kitties = ["a", "b", "c"];

    function getKitty(uint256 _kittyId)
        external
        view
        returns (
            bool isGestating,
            bool isReady,
            uint256 cooldownIndex,
            uint256 nextActionAt,
            uint256 siringWithId,
            uint256 birthTime,
            uint256 matronId,
            uint256 sireId,
            uint256 generation,
            uint256 genes
        )
    {
        uint256 rand = uint256(keccak256(abi.encodePacked(kitties[_kittyId])));
        return (false, false, 0, 0, 0, 0, 0, 0, 0, rand);
    }
}
