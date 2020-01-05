// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITPATHSPECMATCHLIST_H
#define GITPATHSPECMATCHLIST_H
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

#include "../include/diff_delta.h"
// Forward declaration.
struct git_pathspec_match_list {
};

using namespace node;
using namespace v8;

class GitPathspecMatchList;

struct GitPathspecMatchListTraits {
  typedef GitPathspecMatchList cppClass;
  typedef git_pathspec_match_list cType;

  static const bool isDuplicable = false;
  static void duplicate(git_pathspec_match_list **dest, git_pathspec_match_list *src) {
     Nan::ThrowError("duplicate called on GitPathspecMatchList which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_pathspec_match_list *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::git_pathspec_match_list_free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitPathspecMatchList : public
  NodeGitWrapper<GitPathspecMatchListTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitPathspecMatchListTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                   

  private:
    GitPathspecMatchList()
      : NodeGitWrapper<GitPathspecMatchListTraits>(
           "A new GitPathspecMatchList cannot be instantiated."
       )
    {}
    GitPathspecMatchList(git_pathspec_match_list *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitPathspecMatchListTraits>(raw, selfFreeing, owner)
    {}
    ~GitPathspecMatchList();
                   
    static NAN_METHOD(DiffEntry);

    static NAN_METHOD(Entry);

    static NAN_METHOD(Entrycount);

    static NAN_METHOD(FailedEntry);

    static NAN_METHOD(FailedEntrycount);
};

#endif
