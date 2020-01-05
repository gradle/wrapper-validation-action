// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITINDEXERPROGRESS_H
#define GITINDEXERPROGRESS_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>
#include <unordered_map>
#include <sstream>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"
#include "reference_counter.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"


using namespace node;
using namespace v8;

class GitIndexerProgress;

struct GitIndexerProgressTraits {
  typedef GitIndexerProgress cppClass;
  typedef git_indexer_progress cType;

  static const bool isDuplicable = false;
  static void duplicate(git_indexer_progress **dest, git_indexer_progress *src) {
     Nan::ThrowError("duplicate called on GitIndexerProgress which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_indexer_progress *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitIndexerProgress : public
  NodeGitWrapper<GitIndexerProgressTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitIndexerProgressTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitIndexerProgress()
      : NodeGitWrapper<GitIndexerProgressTraits>(
           "A new GitIndexerProgress cannot be instantiated."
       )
    {}
    GitIndexerProgress(git_indexer_progress *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitIndexerProgressTraits>(raw, selfFreeing, owner)
    {}
    ~GitIndexerProgress();
     static NAN_METHOD(TotalObjects);
    static NAN_METHOD(IndexedObjects);
    static NAN_METHOD(ReceivedObjects);
    static NAN_METHOD(LocalObjects);
    static NAN_METHOD(TotalDeltas);
    static NAN_METHOD(IndexedDeltas);
    static NAN_METHOD(ReceivedBytes);
};

#endif
