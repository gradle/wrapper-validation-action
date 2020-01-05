// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITINDEXTIME_H
#define GITINDEXTIME_H
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

class GitIndexTime;

struct GitIndexTimeTraits {
  typedef GitIndexTime cppClass;
  typedef git_index_time cType;

  static const bool isDuplicable = false;
  static void duplicate(git_index_time **dest, git_index_time *src) {
     Nan::ThrowError("duplicate called on GitIndexTime which cannot be duplicated");
   }

  static const bool isSingleton = false;
  static const bool isFreeable = true;
  static void free(git_index_time *raw) {
    unsigned long referenceCount = 0;
     if (referenceCount == 0) {
      ::free(raw); // :: to avoid calling this free recursively
    }
   }
};

class GitIndexTime : public
  NodeGitWrapper<GitIndexTimeTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitIndexTimeTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitIndexTime()
      : NodeGitWrapper<GitIndexTimeTraits>(
           "A new GitIndexTime cannot be instantiated."
       )
    {}
    GitIndexTime(git_index_time *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitIndexTimeTraits>(raw, selfFreeing, owner)
    {}
    ~GitIndexTime();
     static NAN_METHOD(Seconds);
    static NAN_METHOD(Nanoseconds);
};

#endif
