package com.library.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.library.dto.CommunityDTO;
import com.library.exception.ResourceNotFoundException;
import com.library.model.Communities;
import com.library.repository.CommunitiesRepository;

@Service
public class CommunitiesService {
	

    private final CommunitiesRepository communitiesRepository;
    
    @Autowired
    public CommunitiesService(CommunitiesRepository communitiesRepository) {
    	this.communitiesRepository=communitiesRepository;
    }


    public List<Communities> getAllCommunities() {
        return communitiesRepository.findAll();
    }
    
    public Communities getCommunitiesById(Long communityId) {
        return communitiesRepository.findById(communityId).orElseThrow(() -> new ResourceNotFoundException("Community not found with id: " + communityId));
    }
    
    
    public Communities createCommunity(CommunityDTO request) {
    	Communities community=new Communities();
    	community.setCommunityId(getNextCommunityId());
    	community.setCommunityName(request.getCommunityName());
    	return communitiesRepository.save(community);
    }
    

	public Communities removeCommunity(Long communityId) {
		communitiesRepository.deleteById(communityId);
		return null;
	}
	
	public Long getTotalCommunities() {
		return communitiesRepository.count();
	}

	private Long getNextCommunityId() {
		Long maxCommunityId = communitiesRepository.findMaxCommunitiesId();
		return maxCommunityId == null ? 1L : maxCommunityId + 1;
	}



}
