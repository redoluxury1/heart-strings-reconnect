
import React from 'react';
import { useJournalEntries, allTags } from './thoughts/useJournalEntries';
import JournalSearch from './thoughts/JournalSearch';
import AddEntryButton from './thoughts/AddEntryButton';
import JournalEntriesList from './thoughts/JournalEntriesList';
import JournalEntryDialog from './thoughts/JournalEntryDialog';

const JournalEntries = () => {
  const {
    filteredEntries,
    viewMode,
    searchTerm,
    setSearchTerm,
    showFavoritesOnly,
    setShowFavoritesOnly,
    toggleFavorite,
    deleteEntry,
    openEditDialog,
    newEntryTitle,
    setNewEntryTitle,
    newEntryContent,
    setNewEntryContent,
    newEntryTags,
    setNewEntryTags,
    isNewEntryDialogOpen,
    setIsNewEntryDialogOpen,
    handleCreateEntry,
    editEntryTitle,
    setEditEntryTitle,
    editEntryContent,
    setEditEntryContent,
    editEntryTags,
    setEditEntryTags,
    isEditEntryDialogOpen,
    setIsEditEntryDialogOpen,
    handleEditEntry,
    toggleTag
  } = useJournalEntries();

  return (
    <div className="mt-4 sm:mt-6">
      <h1 className="font-cormorant text-3xl md:text-4xl font-bold text-midnight-indigo mb-8 text-center">
        Personal Thoughts
      </h1>
      
      <p className="text-center mb-10 max-w-lg mx-auto text-midnight-indigo">
        Your private space for reflections, thoughts, and feelings.
        Only you can see what you write here.
      </p>
    
      <JournalSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
      />

      <AddEntryButton onClick={() => setIsNewEntryDialogOpen(true)} />
      
      <div className="mt-8">
        <JournalEntryDialog
          isOpen={isNewEntryDialogOpen}
          onOpenChange={setIsNewEntryDialogOpen}
          title={newEntryTitle}
          setTitle={setNewEntryTitle}
          content={newEntryContent}
          setContent={setNewEntryContent}
          tags={newEntryTags}
          setTags={setNewEntryTags}
          onSave={handleCreateEntry}
          dialogTitle="Create New Journal Entry"
          submitLabel="Save Entry"
          allTags={allTags}
          toggleTag={toggleTag}
        />
        
        <JournalEntryDialog
          isOpen={isEditEntryDialogOpen}
          onOpenChange={setIsEditEntryDialogOpen}
          title={editEntryTitle}
          setTitle={setEditEntryTitle}
          content={editEntryContent}
          setContent={setEditEntryContent}
          tags={editEntryTags}
          setTags={setEditEntryTags}
          onSave={handleEditEntry}
          dialogTitle="Edit Journal Entry"
          submitLabel="Update Entry"
          allTags={allTags}
          toggleTag={toggleTag}
        />
        
        <JournalEntriesList
          entries={filteredEntries}
          viewMode={viewMode}
          toggleFavorite={toggleFavorite}
          deleteEntry={deleteEntry}
          openEditDialog={openEditDialog}
        />
      </div>
    </div>
  );
};

export default JournalEntries;
